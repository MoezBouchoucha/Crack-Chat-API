import os
import sys
from fastapi import APIRouter
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), "../../app/controllers"))

from api_controller import api


api_router = APIRouter(tags=["api"])
api_router.post("/api")(api)