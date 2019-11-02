from django.db import models


class GCalEvent(models.Model):
    ...
    # GCal ID
    # Date cache
    # TODO: Cache refresh policies


class RSVP(models.Model):
    event = models.ForeignKey(GCalEvent)
    user = models.ForeignKey('drf_firebase_auth.FirebaseUser')
    email = models.EmailField(required=False, blank=True)
    phone = models.CharField(required=False, blank=True)
    notified = models.Boolean(default=False)

    # TODO: Send notifications
