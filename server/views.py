# Create your views here.
# -*- coding: utf-8 -*-
from  django.http  import  HttpResponse
import time
import random
import datetime
import os
import json
from django import forms
from django.http import HttpResponseRedirect
from selenium import webdriver 
from django.middleware.csrf import get_token ,rotate_token
from django.shortcuts import render
from server.http_post import http_md5
from server.http_post import orderuid_md5

def index (request):
    content = {}
    get_token(request)
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    option = webdriver.ChromeOptions()
    option.add_argument('disable-infobars')
    option.add_argument("--disable-gpu")
    option.add_argument("--headless")
    driver = webdriver.Chrome(BASE_DIR+'/server/chromedriver',chrome_options=option)
    driver.get('http://www.iqiyi.com/iframe/loginreg')
#     time.sleep(1)
    file_object = open(BASE_DIR+'/server/iqiyi.js','r')
    js = file_object.read()
    driver.execute_script(js,"qw199003")
    time.sleep(1)
    file_object.close()
    driver.quit()
    return  render(request,'UI.html',content)
def ajax_test_add(request):
#     envinfo = request.GET.get('envinfo')
    print(123)
def envin(request):
    user = json.loads(request.body.decode('utf-8'))
    print(user['envinfo'])
    print(user['passwd'])
    return  HttpResponse ( "Hello" ) 
def iqiyipay(request):
    content = {}
    get_token(request)
    return  render(request,'iqiyipay.html',content)
def wechatpay(request):
    if request.method == 'POST':
        ip_address_info = json.loads(request.body.decode('utf-8'))
#         ip_address = ip_address_info['ip_address_info']
        orderuid = orderuid_md5(ip_address_info['orderuid'])
#         print(ip_address_info)
        orderid = '1'+time.strftime('%Y%m%d%H%M%S', time.localtime(time.time()))+str(random.randint(1000, 9999))  
        dict_message= http_md5(orderuid,orderid,'2')
        dict_message['code'] = 1
        json_data=json.dumps(dict_message)
        return HttpResponse(json_data)
    else:
        dict_message={}
        info = '请刷新后重新支付！'
        dict_message['msg']=info
        dict_message['code']= -1
        json_data=json.dumps(dict_message)
        return  HttpResponse (json_data)
def alipay(request):
    if request.method == 'POST':
        print(request.body.decode('utf-8'))
        ip_address_info = json.loads(request.body.decode('utf-8'))
#         ip_address = ip_address_info['ip_address_info']
        orderuid = orderuid_md5(ip_address_info['orderuid'])
        print(orderuid)
        orderid = '1'+time.strftime('%Y%m%d%H%M%S', time.localtime(time.time()))+str(random.randint(1000, 9999))
        dict_message= http_md5(orderuid,orderid,'1')
        dict_message['code'] = 1
        json_data=json.dumps(dict_message)
        return HttpResponse(json_data)
#         return  HttpResponse ( "alipay" )
    else:
        dict_message={}
        info = '请刷新后重新支付！'
        dict_message['msg']=info
        dict_message['code']= -1
        json_data=json.dumps(dict_message)
        return  HttpResponse (json_data)
def register(request):
    content = {}
    get_token(request)
#     if request.method == 'POST':
#         data = json.loads(request.body.decode('utf-8'))
#         print(data)
#         return  render(request,'register.html',content)
#     else:
#         return  HttpResponse ("error!!!")
    return  render(request,'register.html',content)
def success(request):
    if request.method == 'GET':
        data = json.loads(request.body.decode('utf-8'))