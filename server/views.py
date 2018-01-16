# Create your views here.
from  django.http  import  HttpResponse 
import time
import json
from selenium import webdriver 
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import render

def index (request):
    driver = webdriver.Chrome('/Users/qfgao/Documents/workspace/myiqiyi/server/chromedriver')
    driver.get('http://www.iqiyi.com/iframe/loginreg')
    time.sleep(1)
    file_object = open('/Users/qfgao/Documents/workspace/myiqiyi/server/iqiyi.js','r')
    js = file_object.read()
    driver.execute_script(js)
    time.sleep(1)
    file_object.close()
    driver.quit()
    return  HttpResponse ( "Hello world" ) 
def ajax_test_add(request):
#     envinfo = request.GET.get('envinfo')
    print(123)
def envin(request):
    user = json.loads(request.body.decode())
    print(user['username'])
    return  HttpResponse ( "Hello" ) 