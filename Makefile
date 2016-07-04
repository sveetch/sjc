FOUNDATION_VERSION=5.5.3

.PHONY: help clean delpyc install install-foundation syncf5

help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo
	@echo "  install              -- to proceed to a new install of this project. Use clean command before if you want to reset a current install"
	@echo "  install-foundation   -- to install (or re-install) Foundation sources"
	@echo "  syncf5               -- to update staticfiles with Foundation sources (use this is you upgrade Foundation sources)"
	@echo
	@echo "  clean                -- to clean your local repository from all stuff created by buildout and instance usage"
	@echo "  delpyc               -- to remove all *.pyc files, this is recursive from the current directory"
	@echo

delpyc:
	find . -name "*\.pyc"|xargs rm -f

clean: delpyc
	rm -Rf bin pip-selfcheck.json include eggs lib parts local

install:
	virtualenv --no-site-packages --setuptools .
	bin/pip install -r requirements.txt

install-foundation:
	rm -Rf foundation5
	foundation new foundation5 --version=$(FOUNDATION_VERSION)
	@echo "Foundation v$(FOUNDATION_VERSION) sources has been installed, now you should synchronize assets using 'syncf5' action"

syncf5:
	@echo "* Updating jQuery sources"
	cp foundation5/bower_components/jquery/dist/jquery.js foundation5/bower_components/foundation/js/vendor/jquery.js
	@echo "* Updating Foundation static files"
	rm -Rf project/sources/js/foundation5
	cp -r foundation5/bower_components/foundation/js project/sources/js/foundation5
	@echo "* Cleaning vendor libs"
	rm -Rf project/sources/js/foundation5/vendor
	mkdir -p project/sources/js/foundation5/vendor
	@echo "* Getting the real sources for updated vendor libs"
	cp foundation5/bower_components/fastclick/lib/fastclick.js project/sources/js/foundation5/vendor/
	cp foundation5/bower_components/foundation/js/vendor/jquery.js project/sources/js/foundation5/vendor/
	cp foundation5/bower_components/jquery-placeholder/jquery.placeholder.js project/sources/js/foundation5/vendor/
	cp foundation5/bower_components/jquery.cookie/jquery.cookie.js project/sources/js/foundation5/vendor/
	cp foundation5/bower_components/modernizr/modernizr.js project/sources/js/foundation5/vendor/
	@echo "* Updating Foundation SASS sources"
	rm -Rf project/sources/sass/foundation5
	cp -r foundation5/bower_components/foundation/scss project/sources/sass/foundation5
