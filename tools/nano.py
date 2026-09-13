#!/usr/bin/env python
"""
nano.py — generate or edit images with Google's image models (Nano Banana).

Reads GEMINI_API_KEY from the process env, falling back to the Windows
User-scope variable, because `setx` only reaches processes started after it.

  python tools/nano.py "a prompt"                       -> img/out.png
  python tools/nano.py "a prompt" -o img/hero.png
  python tools/nano.py "make the background violet" -i img/mark.webp
  python tools/nano.py "..." -i a.png -i b.png -m gemini-3-pro-image
  python tools/nano.py --list

Edits accept multiple input images; the model keeps subjects consistent
across them, which is the reason to use this model over a text-only one.
"""
import argparse, base64, json, mimetypes, os, subprocess, sys, urllib.request

API = "https://generativelanguage.googleapis.com/v1beta/models"
DEFAULT_MODEL = "gemini-2.5-flash-image"   # Nano Banana


def api_key():
    k = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if k:
        return k
    if sys.platform == "win32":
        # setx writes to the User scope; a session started earlier never sees it
        try:
            out = subprocess.run(
                ["powershell", "-NoProfile", "-Command",
                 "[Environment]::GetEnvironmentVariable('GEMINI_API_KEY','User')"],
                capture_output=True, text=True, timeout=20)
            k = out.stdout.strip()
            if k:
                return k
        except Exception:
            pass
    sys.exit("No GEMINI_API_KEY found. Set it, then reopen the shell.")


def post(url, payload):
    req = urllib.request.Request(
        url, data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")[:900]
        sys.exit(f"HTTP {e.code}\n{body}")


def list_models(key):
    with urllib.request.urlopen(f"{API}?key={key}", timeout=60) as r:
        data = json.loads(r.read())
    for m in data.get("models", []):
        if "image" in m["name"]:
            print(f"{m['name'].split('/')[-1]:34} {m.get('displayName','')}")


def main():
    p = argparse.ArgumentParser()
    p.add_argument("prompt", nargs="?", help="what to generate or how to edit")
    p.add_argument("-i", "--image", action="append", default=[],
                   help="input image to edit; repeatable")
    p.add_argument("-o", "--out", default="img/out.png")
    p.add_argument("-m", "--model", default=DEFAULT_MODEL)
    p.add_argument("--list", action="store_true", help="list image models")
    a = p.parse_args()

    key = api_key()
    if a.list:
        return list_models(key)
    if not a.prompt:
        p.error("a prompt is required unless --list")

    parts = [{"text": a.prompt}]
    for path in a.image:
        if not os.path.exists(path):
            sys.exit(f"missing input image: {path}")
        mime = mimetypes.guess_type(path)[0] or "image/png"
        with open(path, "rb") as f:
            parts.append({"inline_data": {
                "mime_type": mime,
                "data": base64.b64encode(f.read()).decode()}})

    res = post(f"{API}/{a.model}:generateContent?key={key}",
               {"contents": [{"parts": parts}]})

    cands = res.get("candidates") or []
    if not cands:
        sys.exit("No candidates returned:\n" + json.dumps(res)[:800])

    saved, notes = [], []
    os.makedirs(os.path.dirname(a.out) or ".", exist_ok=True)
    stem, ext = os.path.splitext(a.out)
    for c in cands:
        for n, part in enumerate(c.get("content", {}).get("parts", [])):
            blob = part.get("inlineData") or part.get("inline_data")
            if blob:
                dest = a.out if not saved else f"{stem}-{len(saved)+1}{ext}"
                with open(dest, "wb") as f:
                    f.write(base64.b64decode(blob["data"]))
                saved.append(dest)
            elif part.get("text"):
                notes.append(part["text"].strip())

    for s in saved:
        print(f"saved {s}  ({os.path.getsize(s)//1024} KB)")
    for t in notes:
        print(f"note: {t[:300]}")
    if not saved:
        fr = (cands[0].get("finishReason") or "")
        sys.exit(f"No image returned. finishReason={fr}\n" + "\n".join(notes)[:500])


if __name__ == "__main__":
    main()
