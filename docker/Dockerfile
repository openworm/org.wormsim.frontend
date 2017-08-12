FROM java:7
MAINTAINER Stephen Larson "slarson@openworm.org"

RUN apt-get update && apt-get install -y sudo

RUN useradd -ms /bin/bash developer

RUN mkdir -p /home/developer && mkdir -p /etc/sudoers.d \
    echo "developer:x:1000:1000:Developer,,,:/home/developer:/bin/bash" >> /etc/passwd && \
    echo "developer:x:1000:" >> /etc/group && \
    echo "developer ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/developer && \
    chmod 0440 /etc/sudoers.d/developer && \
    chown developer:developer -R /home/developer && \
    chown root:root /usr/bin/sudo && chmod 4755 /usr/bin/sudo

USER developer
ENV HOME /home/developer
WORKDIR /home/developer

#VIRGO INSTALL
USER root
RUN apt-get update && apt-get install -y curl bsdtar maven nodejs npm 
RUN npm install -g bower && ln -s /usr/bin/nodejs /usr/bin/node
USER developer

RUN mkdir -p /home/developer/virgo
RUN curl -L 'http://www.eclipse.org/downloads/download.php?file=/virgo/release/VP/3.6.4.RELEASE/virgo-tomcat-server-3.6.4.RELEASE.zip&mirror_id=580&r=1' | bsdtar --strip-components 1 -C /home/developer/virgo -xzf -
RUN chmod u+x /home/developer/virgo/bin/*.sh
ENV SERVER_HOME /home/developer/virgo
#VOLUME /home/developer/virgo
#END VIRGO INSTALL

#GET GEPPETTO SOURCES
USER root
RUN mkdir -p workspace && cd workspace && git clone http://github.com/openworm/org.geppetto && cd org.geppetto && git checkout tags/v0.2.6-alpha 
RUN cd workspace && git clone http://github.com/openworm/org.geppetto.frontend && cd org.geppetto.frontend && git checkout tags/v0.2.6-alpha 
RUN cd workspace && git clone http://github.com/openworm/org.geppetto.core && cd org.geppetto.core && git checkout tags/v0.2.6-alpha 
RUN cd workspace && git clone http://github.com/openworm/org.geppetto.simulation && cd org.geppetto.simulation && git checkout tags/v0.2.6-alpha 
RUN cd workspace && git clone http://github.com/openworm/org.geppetto.model.neuroml && cd org.geppetto.model.neuroml && git checkout tags/v0.2.6-alpha
RUN cd workspace && git clone http://github.com/openworm/org.wormsim.frontend
RUN chmod -R 777 workspace

USER developer

COPY bower.json workspace/org.geppetto.frontend/src/main/webapp/js/
RUN cd workspace/org.geppetto.frontend/src/main/webapp/js && bower install

COPY components.js workspace/org.geppetto.frontend/src/main/webapp/js/
RUN cd workspace/org.wormsim.frontend/utilities/ && sudo python applyWormSimTheme.py && sudo python deployWormSimComponents.py && sudo python deployWormSimData.py

COPY geppetto.plan workspace/org.geppetto

RUN cd workspace/org.geppetto && mvn install
#END GET GEPPETTO SOURCES

RUN mkdir -p geppetto/

RUN cd /home/developer/workspace/org.geppetto/utilities/source_setup && python update_server.py



CMD /home/developer/virgo/bin/startup.sh
