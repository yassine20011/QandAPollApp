from django.contrib import admin
from django.contrib import admin
from .models import Session, Question, Options

class OptionsInline(admin.TabularInline):
    model = Options
    extra = 1

class QuestionInline(admin.TabularInline):
    model = Question
    inlines = [OptionsInline]
    extra = 1

@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    list_display = ('user', 'code')
    inlines = [QuestionInline]

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('session', 'question')
    inlines = [OptionsInline]

@admin.register(Options)
class OptionsAdmin(admin.ModelAdmin):
    list_display = ('question', 'option')
