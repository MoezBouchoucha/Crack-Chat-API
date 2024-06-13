import sys
import os
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), "../../app/controllers"))
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), "../../app/controllers"))
from fastapi import FastAPI
import uvicorn
import config
from fastapi.middleware.cors import CORSMiddleware
from routers.api_router import api_router
from routers.api_with_memory_router import api_with_memory_router
from api_controller import launch_download


def init_app():
    """
    creates all necessary objects and connexions to launch the backend
    """
    # create fastapi app instance
    app = FastAPI()
    
    launch_download()
    return app
app = init_app()

# routes
app.include_router(api_router,prefix='/api')
app.include_router(api_with_memory_router,prefix='/api_memory')
# app.include_router(api_list_request_router,prefix='/api_list')


if __name__=="__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
