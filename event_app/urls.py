from django.urls import path
from . import views

urlpatterns = [
    path('city/', views.city_page, name='city_page'),
    path('event-types/', views.event_types, name='event_types'),
    path('map/', views.map_page, name='map_page'),
]