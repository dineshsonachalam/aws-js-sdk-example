var supertest = require("supertest");
const { expect } = require('chai');
var server = supertest.agent("http://0.0.0.0:5000");

describe("GET /vpc/regions",function(){
    it("should return the list of all VPC regions",function(done){
        server.get("/vpc/regions")
              .expect("Content-type",/json/)
              .expect(200)
              .end(function(err,res){
                    res.statusCode.valueOf(200);
                    expect(res.body).to.deep.include({
                        Endpoint: 'ec2.eu-north-1.amazonaws.com',
                        RegionName: 'eu-north-1',
                        OptInStatus: 'opt-in-not-required'
                    }); 
                    done();
              });
    });
});

describe("GET /vpc/regions/{region}",function(){
    it("should return a list of all VPCs within a specific region",function(done){
        server.get("/vpc/regions/us-east-1")
              .expect("Content-type",/json/)
              .expect(200)
              .end(function(err,res){
                    res.statusCode.valueOf(200);
                    expect(res.body).to.deep.include({
                        "CidrBlock": "10.0.0.0/16",
                        "DhcpOptionsId": "dopt-19b3437f",
                        "State": "available",
                        "VpcId": "vpc-001ed9d92f95cc310",
                        "OwnerId": "125381164200",
                        "InstanceTenancy": "default",
                        "Ipv6CidrBlockAssociationSet": [],
                        "CidrBlockAssociationSet": [
                            {
                                "AssociationId": "vpc-cidr-assoc-0eb334e4423419367",
                                "CidrBlock": "10.0.0.0/16",
                                "CidrBlockState": {
                                    "State": "associated"
                                }
                            }
                        ],
                        "IsDefault": false,
                        "Tags": [
                            {
                                "Key": "Name",
                                "Value": "usa-newyork-1"
                            }
                        ]
                    }); 
                    done();
              });
    });
});

describe("GET /vpc/{id}/{region}",function(){
    it("should return a list of all Subnets within a specific VPC",function(done){
        server.get("/vpc/vpc-092c7473932fcc907/us-east-1")
              .expect("Content-type",/json/)
              .expect(200)
              .end(function(err,res){
                    res.statusCode.valueOf(200);
                    expect(res.body).to.deep.include({
                        "AvailabilityZone": "us-east-1d",
                        "AvailabilityZoneId": "use1-az2",
                        "AvailableIpAddressCount": 251,
                        "CidrBlock": "172.30.3.0/24",
                        "DefaultForAz": false,
                        "MapPublicIpOnLaunch": true,
                        "MapCustomerOwnedIpOnLaunch": false,
                        "State": "available",
                        "SubnetId": "subnet-0fa63a3883d2f089e",
                        "VpcId": "vpc-092c7473932fcc907",
                        "OwnerId": "125381164200",
                        "AssignIpv6AddressOnCreation": false,
                        "Ipv6CidrBlockAssociationSet": [],
                        "Tags": [],
                        "SubnetArn": "arn:aws:ec2:us-east-1:125381164200:subnet/subnet-0fa63a3883d2f089e"
                    }); 
                    done();
              });
    });
});