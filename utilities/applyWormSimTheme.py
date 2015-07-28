import os

git_path = '../..'

os.system("find " + git_path + "/org.geppetto.frontend/src/main/webapp/ -type f \( -name '*.css' -or -name '*.less' \) -exec sed -i '' 's/#fc6320/#D6F729/g' {} \;")
os.system("find " + git_path + "/org.geppetto.frontend/src/main/webapp/ -type f \( -name '*.css' -or -name '*.less' \) -exec sed -i '' 's/#fd6808/#D6F729/g' {} \;")
os.system("find " + git_path + "/org.geppetto.frontend/src/main/webapp/less/main.less -type f \( -name '*.js' -or -name '*.css' -or -name '*.less' \) -exec sed -i '' 's/background-color: #000000/background-color: #F8FFD2/g' {} \;")
