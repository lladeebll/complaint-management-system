import sys
import pytest


sys.path.append("..")

from server import create_app


@pytest.fixture
def app():

    app = create_app()
    yield app

@pytest.fixture
def client(app):
    return app.test_client()
