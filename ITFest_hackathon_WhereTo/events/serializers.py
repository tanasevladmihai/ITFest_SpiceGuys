from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import Event

class EventSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Event
        geo_field = 'location'
        fields = ('id', 'name', 'theme', 'distance', 'address', 'start_date', 'end_date', 'description')