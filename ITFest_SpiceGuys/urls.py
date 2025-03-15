from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('events/', include('event_app.urls')),  # Add this line
]