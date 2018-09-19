FROM python:3.5-alpine

ADD ./requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt

ADD . /app
RUN cp /app/config.docker.py /app/config.py

CMD python index.py
WORKDIR /app
EXPOSE 5000
