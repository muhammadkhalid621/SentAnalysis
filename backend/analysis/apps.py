from django.apps import AppConfig


class AnalysisConfig(AppConfig):
    name = 'analysis'
    def ready(self):
        from .update import start
        start()