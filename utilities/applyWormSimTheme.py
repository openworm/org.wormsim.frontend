import os

git_path = '../../org.geppetto.frontend/src/main/webapp/'

os.system("find {0} -type f \( -name '*.css' -or -name '*.less' \) | xargs sed -i -e 's/#fc6320/#D6F729/g' ".format(git_path))
os.system("find {0} -type f \( -name '*.css' -or -name '*.less' \) | xargs sed -i -e 's/#fd6808/#D6F729/g' ".format(git_path))
os.system("sed -i -e 's/background-color: #000000/background-color: #222222/g' {0}less/main.less ".format(git_path))
