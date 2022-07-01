from django.contrib import admin
from .models import Twitter_Scrapper, Fb_scrapper_pages, Fb_scrapper_post, Fb_scrapper_comments, Fb_scrapper_groups

# Register your models here.
admin.site.register(Twitter_Scrapper)
admin.site.register(Fb_scrapper_pages)
admin.site.register(Fb_scrapper_post)
admin.site.register(Fb_scrapper_comments)
admin.site.register(Fb_scrapper_groups)
