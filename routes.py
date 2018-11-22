from app import app, api
from flask import send_from_directory

from controller.website_contoller import WebsiteController
from controller.page_contoller import PageController
from controller.screenshot_controller import PageScreenshotController
from controller.form_contoller import FormController
from controller.field_contoller import FieldController
from controller.test_controller import TestController


############# Static files ###############

@app.route('/')
@app.route('/index')
def serve_index():
    return send_from_directory('client/', 'index.html')

@app.route('/<path:path>')
def serve_files(path):
    return send_from_directory('client', path)

############ API ###############

api.add_resource(WebsiteController, '/website', '/website/<string:id>')

api.add_resource(PageController, '/page/<string:id>')

api.add_resource(PageScreenshotController, '/page_screenshot/<string:id>')

api.add_resource(FormController, '/form/<string:id>')

api.add_resource(FieldController, '/field/<string:id>')

api.add_resource(TestController, '/test', '/test/<string:form_id>')
