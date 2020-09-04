import os
from django.shortcuts import render
from django.views.generic.detail import DetailView

def index(request):
    return render(request, os.path.join(settings.FILES_DIR, 'index.html'))
