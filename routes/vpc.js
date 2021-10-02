const express = require("express");
const router = express.Router();
var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const ec2 = new AWS.EC2();
/**
 * @swagger
 * components:
 *   schemas:
 *     VPC:
 *       type: object
 *       required:
 *       properties:
 *         id:
 *           type: string
 *           description: VPC id
 *         region:
 *           type: string
 *           description: VPC region
 *       example:
 *         id: vpc-092c7473932fcc907
 *         region: eu-west-1
*/

/**
  * @swagger
  * tags:
  *   name: Vpc
  *   description: AWS VPC API
*/

/**
 * @swagger
 * /vpc/regions:
 *   get:
 *     summary: Return the list of all VPC regions
 *     tags: [Vpc]
 *     responses:
 *       200:
 *         description: The list of all VPC regions
*/
router.get("/regions", (req, res) => {
  ec2.describeRegions({}, function(error, data) {
    if(error){
      return res.status(500).send(error);
    }else{
      res.send(data.Regions);
    }
  });
});

/**
 * @swagger
 * /vpc/regions/{region}:
 *   get:
 *     summary: Return a list of all VPCs within a specific region
 *     tags: [Vpc]
 *     parameters:
 *       - in: path
 *         name: region
 *         schema:
 *           type: string
 *         required: true
 *         description: Region name
 *     responses:
 *       200:
 *         description: The list of all VPCs within a specific region
*/
router.get("/regions/:region", (req, res) => {
    new AWS.EC2({region: req.params.region}).describeVpcs({}, function(error, data) {
      if(error){
        return res.status(500).send(error);
      }else{
        res.send(data.Vpcs);
      }
    });
});

/**
 * @swagger
 * /vpc/{id}/{region}:
 *   get:
 *     summary: Return a list of all Subnets within a specific VPC
 *     tags: [Vpc]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: VPC id
  *       - in: path
 *         name: region
 *         schema:
 *           type: string
 *         required: true
 *         description: VPC region
 *     responses:
 *       200:
 *         description: The list of all Subnets within a specific VPC
*/
router.get("/:id/:region", (req, res) => {    
    let params = {
      Filters: [
        {
          Name: "vpc-id", 
          Values: [
            req.params.id
          ]
        }
      ]
    };

    new AWS.EC2({region: req.params.region}).describeSubnets(params, function(error, data) {
      if(error){
        return res.status(500).send(error);
      }else{
        res.send(data.Subnets);
      }
    });
});

module.exports = router;