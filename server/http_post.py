import hashlib
import django

def http_md5(orderuid,orderid,istype):
    data_json = {
        'uid': 'c90c94ec46a3c4f8e741f876', 
        'price':'9.90',
        'istype':'',
        'notify_url':'http://39.104.113.154/server/success',
        'return_url':'http://39.104.113.154/server/register',
        'orderid':'',
        'orderuid':'',
        'goodsname':'iqiyi_VIP',
        'key':''}
    token = 'a0af9a6ccc8872c97415dc63f2261056'
    data_json['orderid']=orderid
    data_json['orderuid']=orderuid
    data_json['istype']=istype
    str_1 = data_json['goodsname'] + data_json['istype'] + data_json['notify_url'] + data_json['orderid'] + data_json['orderuid'] + data_json['price'] + data_json['return_url'] + token + data_json['uid']
    m2 = hashlib.md5()
    m2.update(str_1.encode("utf-8"))
    data_json['key'] = str(m2.hexdigest())
#     print(data_json)
    return data_json
def orderuid_md5(orderuid):
    m2 = hashlib.md5()
    m2.update(orderuid.encode("utf-8"))
    data_json = str(m2.hexdigest())
#     print(data_json)
    return data_json
    