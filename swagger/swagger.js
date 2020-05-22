const config = require('../config/confg');
const { capitalize } = require('../utils/utils'); 
const appName = capitalize(config.application.name);

const swagger = {
    "swagger": "2.0",
    "info": {
      "description": `${appName} API`,
      "version": "1.0.0",
      "title": `${appName} API Test`,
      "termsOfService": "",
      "contact": { "email": "mo.mustafa3@gmail.com" },
      "license": {
        "name": "",
        "url": ""
      }
    },
    "host": `${config.application.domain}:${config.application.port}`,
    "basePath": "/api/v1",
    "tags": [
      {
        "name": `${appName}`,
        "description": `User Management API`,
        "externalDocs": {
          "description": "",
          "schema": {
          }
        }
      }
    ],
    "schemes": ["http"],
    "paths": {
      "/user/signup": {
        "post": {
          "tags": [`${appName}`],
          "summary": "Signup",
          "description": "",
          "operationId": "userSignup",
          "consumes": ["application/json"],
          "produces": ["application/json"],
          "parameters": [
            {
              "in": "body",
              "name": "body",
              "description": `${appName} Signup Account`,
              "required": true,
              "schema": { "$ref": "#/definitions/userCredential" }
            }
          ],
          "responses": { 
            "200": { 
              "schema": { "$ref": "#/definitions/successfulResponse" }
            },
            "400": { 
              "schema": { "$ref": "#/definitions/errorResponse" }
            },
            "409": { 
              "schema": { "$ref": "#/definitions/errorResponse" }
            },
            "500": { 
              "schema": { "$ref": "#/definitions/errorResponse" }
            } 
          }
        }
      },
      "/user/login": {
        "post": {
          "tags": [`${appName}`],
          "summary": "Login",
          "description": "",
          "operationId": "userLogin",
          "consumes": ["application/json"],
          "produces": ["application/json"],
          "parameters": [
            {
              "in": "body",
              "name": "body",
              "description": `${appName} Login Account`,
              "required": true,
              "schema": { "$ref": "#/definitions/userCredential" }
            }
          ],
          "responses": { 
            "200": { 
              "schema": { "$ref": "#/definitions/successfulResponse" }
            },
            "400": { 
              "schema": { "$ref": "#/definitions/errorResponse" }
            },
            "401": { 
              "schema": { "$ref": "#/definitions/errorResponse" }
            },
            "500": { 
              "schema": { "$ref": "#/definitions/errorResponse" }
            } 
          }
        }
      }
    },
    "securityDefinitions": {},
    "definitions": {
      "userCredential": {
        "type": "object",
        "properties": {
          "username": { 
            "type": "string",
            "minLength": 1,
            "maxLength": 50,
            "description": "Username" 
          },
          "password": { 
            "type": "string",
            "minLength": 1,
            "maxLength": 50,
            "description": "Password" 
          }
        },
        "required": [
          "username",
          "password"
        ]
      },
      "successfulResponse": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string",
            "example": "Successfully Inserted"
          }
        }
      },
      "errorResponse": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string",
            "example": "Error ..."
          }
        }
      }
    },
    "externalDocs": {
      "description": "Github Repository",
      "url":`"https://github.com/webmanic/${appName.toLowerCase()}-api`
    }
  }
  

  module.exports = swagger;