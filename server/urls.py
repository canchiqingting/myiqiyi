from  django.urls  import  path 

from  .  import  views 

urlpatterns  =  [ 
    path ( '' ,  views . index ,  name = 'index' ),
    path(r'envinfo/', views.ajax_test_add, name = 'ajax_test_add'),
    path(r'envin/', views.envin, name = 'envin'),  
]