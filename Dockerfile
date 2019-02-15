FROM python:3.5-alpine

# Build-time metadata as defined at http://label-schema.org
ARG BUILD_DATE
ARG VCS_REF
LABEL org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.name="PassIon" \
      org.label-schema.description="Safe password and sensitive data sharing" \
      org.label-schema.url="https://github.com/heureka/passIon" \
      org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.vcs-url="https://github.com/heureka/passIon" \
      org.label-schema.vendor="Heureka Shopping s.r.o." \
      org.label-schema.schema-version="1.0"

ADD ./requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt

ADD . /app
RUN cp /app/config.docker.py /app/config.py

WORKDIR /app
EXPOSE 5000

ENTRYPOINT ["python", "index.py"]
