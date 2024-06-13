import sys
import os
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)),"../helpers"))

from pathlib import Path
from helpers import *
from chrome_d_download import chromeDriverDownloader
from unzipper import unzip_launch
import subprocess

def api(prompt:str):

    start_chat_gpt()
    x= make_gpt_request(prompt)
    stop_chat_gpt()
    return x

def launch_download():

    c_path=Path(os.path.dirname(os.path.realpath(__file__)))
    path=c_path.parent.parent
    l=os.listdir(path)
    
    if "chromedriver-win64" not in l and "chromeDriver_zips" not in l:
        chromeDriverDownloader()

        # subprocess.call

        print("Unzipping chromedriver")

        from unzipper import unzip_launch
        unzip_launch()

    