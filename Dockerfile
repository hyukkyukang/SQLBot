FROM nvidia/cuda:12.2.0-devel-ubuntu22.04

# Set timezone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install basic packages
RUN apt update
RUN apt install gnupg git curl make cmake g++ wget zip vim sudo tmux -y
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends tzdata

# Set timezone
RUN ln -fs /usr/share/zoneinfo/Asia/Seoul /etc/localtime && dpkg-reconfigure -f noninteractive tzdata

# Install and setup JAVA
RUN apt install ca-certificates-java -y
RUN DEBIAN_FRONTEND=noninteractive apt install default-jdk -y
RUN echo "JAVA_HOME=\"/usr/bin/java\"" >> /etc/environment

# Install Postgresql
RUN apt install postgresql postgresql-contrib libpq-dev -y

# Install nodejs v20.x
RUN curl -sL https://deb.nodesource.com/setup_20.x -o nodesource_setup.sh && bash nodesource_setup.sh
RUN apt install nodejs

# Intall yarn
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/yarnkey.gpg >/dev/null
RUN echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN sudo apt-get update && sudo apt-get install yarn
RUN yarn global add turbo

# Install prerequisites for python3.11
RUN apt install build-essential checkinstall libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev -y 
# Install python3.11
RUN apt install software-properties-common -y
RUN add-apt-repository ppa:deadsnakes/ppa -y
RUN apt update
RUN apt install python3.11 python3.11-dev -y
RUN apt-get -y install python3-pip python-is-python3
RUN echo "export PYTHONPATH=./" >> ~/.bashrc
RUN echo "export CONFIGPATH=./config.yml" >> ~/.bashrc
RUN echo "export SETUPTOOLS_USE_DISTUTILS=stdlib" >> ~/.bashrc
# Set default python version to 3.11
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.11 1
RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.11 1

# Install prerequisites for faiss-gpu
RUN apt-get install swig libblas-dev liblapack-dev libatlas-base-dev -y

# Install Locale
RUN apt-get install language-pack-en -y

# Install redis
RUN apt install redis-server -y

# Export environment variables
RUN echo "export PATH=${PATH}:/usr/local/cuda/bin" >> ~/.bashrc
RUN echo "export LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:/usr/local/cuda/lib64" >> ~/.bashrc
RUN echo "export CUDA_HOME=/usr/local/cuda" >> ~/.bashrc
RUN echo "export PYTHONPATH=${PYTHONPATH}:./third_party/ColBERT/:third_party/dsp/" >> ~/.bashrc

