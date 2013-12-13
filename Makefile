LESS ?= ./src/wuzzle.less
CSS ?= ./dist/wuzzle.css
CSS_MIN ?= ./dist/wuzzle.min.css
CHECK = \033[32m✔ Done\033[39m

#
# Compile LESS
#

# Depends on `lessc` npm module.

build:
	@printf "\nCompiling and minifying LESS..."
	@lessc ${LESS} > ${CSS}
	@lessc -x ${LESS} > ${CSS_MIN}
	@printf " \033[32m✔ Done\033[39m\n\n"
	@echo "\033[37mThanks for using Wuzzle!\n"

#
# Remove prior builds
#

clean:
	rm ./dist/*