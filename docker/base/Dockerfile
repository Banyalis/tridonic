FROM fedora:33

LABEL name="Docker image for running tests on the CI-pipelines"
LABEL vendor="Zumtobel Group AG"
LABEL maintainer="josua.amann@zumtobelgroup.com"
LABEL build-date="20200703"

SHELL [ "/bin/bash", "-l", "-c" ]

RUN yum update -y && \
    yum clean all
RUN yum install -y openssh-clients \
                   git && \
    yum clean all
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
RUN nvm install v12.18.0
RUN yum install -y pango.x86_64 \
                   libXcomposite.x86_64 \
                   libXcursor.x86_64 \
                   libXdamage.x86_64 \
                   libXext.x86_64 \
                   libXi.x86_64 \
                   libXtst.x86_64 \
                   cups-libs.x86_64 \
                   libXScrnSaver.x86_64 \
                   libXrandr.x86_64 \
                   GConf2.x86_64 \
                   alsa-lib.x86_64 \
                   atk.x86_64 \
                   gtk3.x86_64 \
                   ipa-gothic-fonts \
                   xorg-x11-fonts-100dpi \
                   xorg-x11-fonts-75dpi \
                   xorg-x11-utils \
                   xorg-x11-fonts-cyrillic \
                   xorg-x11-fonts-Type1 \
                   xorg-x11-fonts-misc \
                   chromium-84.0.4147.89-1.fc33 && \
    yum clean all

