from django.shortcuts import render

def city_page(request):
    return render(request, 'event_app/city_page.html')

def event_types(request):
    return render(request, 'event_app/event_types.html')

def map_page(request):
    return render(request, 'event_app/map_page.html')
