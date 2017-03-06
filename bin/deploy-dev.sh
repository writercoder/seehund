#!/bin/bash
set -e

webpack
aws s3 sync dist s3://cloudblogdev.1000mileweb.com