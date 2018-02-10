from  django.urls  import  path 

from  .  import  views 

urlpatterns  =  [ 
    path ( '' ,  views . index ,  name = 'index' ),
    path(r'envinfo/', views.ajax_test_add, name = 'ajax_test_add'),
    path(r'envin/', views.envin, name = 'envin'),
    path(r'iqiyipay/', views.iqiyipay, name = 'iqiyipay'),  
    path(r'alipay/', views.alipay, name = 'alipay'), 
    path(r'wechatpay/', views.wechatpay, name = 'wechatpay'),
    path(r'success/', views.success, name = 'success'),
    path(r'register/', views.register, name = 'register'),
]