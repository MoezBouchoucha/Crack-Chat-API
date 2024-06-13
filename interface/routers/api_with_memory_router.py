import os
import sys
from fastapi import APIRouter
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), "../../app/controllers"))

from api_with_memory_controller import api_with_memory

api_with_memory_router = APIRouter(tags=["api_with_memory"])

api_with_memory_router.post("/api/memory")(api_with_memory)