BASEDIR=$(CURDIR)
OUTPUTDIR=$(BASEDIR)/publish
GITHUB_PAGES_BRANCH=gh-pages

help:
	@echo 'Makefile for a cocos game                                                 '
	@echo '                                                                          '
	@echo 'Usage:                                                                    '
	@echo '   make run                            run game                           '
	@echo '   make clean                          remove the generated files         '
	@echo '   make publish                        compile web                        '
	@echo '   make github                         upload the web site via gh-pages   '
	@echo '                                                                          '

run:
	open http://localhost:8000
	python -m SimpleHTTPServer 8000


clean:
	[ ! -d $(OUTPUTDIR) ] || rm -rf $(OUTPUTDIR)/*

publish: clean
	cp -rf $(BASEDIR)/*.csv $(OUTPUTDIR)/
	cp $(BASEDIR)/index.html $(OUTPUTDIR)/
	cp $(BASEDIR)/testpaper.js $(OUTPUTDIR)/
	cp $(BASEDIR)/jquery-3.1.1.min.js $(OUTPUTDIR)/
	cp $(BASEDIR)/papaparse.min.js $(OUTPUTDIR)/

github: publish
	ghp-import -m "make github" -b $(GITHUB_PAGES_BRANCH) $(OUTPUTDIR) -p
	git add .; git commit -m "update web site"; git push origin master

.PHONY: help run clean publish github
