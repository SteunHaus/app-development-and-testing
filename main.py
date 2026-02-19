import os
import random
from fastapi import FastAPI, HTTPException, Query
from fastapi.staticfiles import StaticFiles

app = FastAPI()

pics = []
for dirpath, dirnames, filenames in os.walk("./frontend/src/attachments"):
    for filename in filenames:
        pics.append(filename)

app.mount("/attachments", StaticFiles(directory="frontend/src/attachments"), name="attachments")

def add_path(picture):
    return f"/src/attachments/{picture}"

@app.get("/api")
def random_picture():
    return f"/src/attachments/{random.choice(pics)}"

@app.post("/api/search")
def select_picture(picture_name: str = Query(...)):
    pictures = [p for p in pics if picture_name.lower() in p.lower()]

    if not pictures:
        raise HTTPException(404, "not found")

    return {
        "items": [
            {"url": add_path(picture)}
            for picture in pictures
        ]
    }