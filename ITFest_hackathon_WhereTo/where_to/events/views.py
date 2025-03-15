from django.shortcuts import render
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point
from .models import Event, City, Category
from .serializers import EventSerializer
from django.utils import timezone

# Template Views
def city_list(request):
    cities = City.objects.all()
    return render(request, 'cities.html', {'cities': cities})

def category_list(request, city_id):
    city = City.objects.get(id=city_id)
    categories = Category.objects.all()
    return render(request, 'categories.html', {'city': city, 'categories': categories})

def event_map(request, city_id, category_id):
    city = City.objects.get(id=city_id)
    category = Category.objects.get(id=category_id)
    return render(request, 'map_page.html', {
        'city': city,
        'category': category,
        'GOOGLE_MAPS_API_KEY': settings.GOOGLE_MAPS_API_KEY
    })

# API View
class EventListAPIView(APIView):
    def get(self, request, city_id, category_id):
        user_location = request.GET.get('location', '0,0')  # Format: lng,lat
        lng, lat = map(float, user_location.split(','))
        user_point = Point(lng, lat, srid=4326)

        events = Event.objects.filter(
            city_id=city_id,
            category_id=category_id,
            end_date__gte=timezone.now()
        ).annotate(
            distance=Distance('location', user_point) / 1000  # Distance in km
        ).order_by('distance')

        serializer = EventSerializer(events, many=True)
        return Response({'events': serializer.data})