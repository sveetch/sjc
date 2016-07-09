# -*- coding: utf-8 -*-
"""
The project pages map for project
"""
import datetime, os

from optimus.builder.pages import PageViewBase
from optimus.conf import settings


class BasePage(PageViewBase):
    """
    Basic page
    """
    title = "Index"
    template_name = "index.html"
    destination = "index.html"

    def get_gallery(self, path=None):
        """
        Retrieve (non recursive) file list from given @path.

        @path is relative to 'images' media directory

        Return filename list of every find files within given dir path.
        """
        files = []
        gallery_dir = None

        if path:
            gallery_dir = os.path.join(settings.STATIC_DIR, path)
            files = [item for item in os.listdir(gallery_dir) if os.path.isfile(os.path.join(gallery_dir, item))]

        return sorted(files)

    def get_context(self):
        context = super(BasePage, self).get_context()

        context.update({
            'datenow': datetime.datetime.now(),
            'get_gallery': self.get_gallery,
        })
        return context


# Enabled pages to build
PAGES = [
    BasePage(
        destination="preview.html",
    ),
    BasePage(
        title="Kitchen Sink",
        template_name="kitchen-sink.html",
        destination="kitchen.html",
    ),
    BasePage(
        title="Note card",
        template_name="notecard.html",
        #destination="notecard.html",
        destination="index.html",
    ),
]
