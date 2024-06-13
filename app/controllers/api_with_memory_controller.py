import sys
import os
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)),"../helpers"))

from helpers import *
import subprocess
from pydantic import BaseModel
from typing import List


class list_prompts(BaseModel):
    data : List[str] | None = None

def api_with_memory(prompts:list_prompts):
    result =[]
    prompts=prompts.dict()
    start_chat_gpt()
    for i in prompts["data"]:
        x= make_gpt_request(i)
        result.append(x)
    stop_chat_gpt()
    return result
