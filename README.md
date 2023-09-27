# Parcel Company Service Documentation

![image](https://github.com/amrmuhamedd/truck-api/assets/47860740/d1ef5fd9-b8e5-4c5f-83d9-c5efc0e05923)

## Table of Contents
- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Design Pattern](#design-pattern)
- [Project Structure](#project-structure)
- [Logic](#logic)
- [Optimization](#optimization)
- [Validation Process](#validation-process)
- [Testing with Jest](#testing-with-jest)
- [Conclusion](#conclusion)

## Introduction
Welcome to the documentation for the Parcel Company Service, a serverless application developed using the Serverless Framework and AWS Lambda. This service provides functionality for managing trucks, loading and unloading parcels, tracking parcel counts and truck weights, and ensuring efficient parcel management for the company.

## Project Overview
The Parcel Company Service is designed to address the needs of a parcel company by allowing the creation of trucks, loading/unloading parcels into/from those trucks, and tracking relevant information such as parcel counts and truck weights. Each parcel can have a distinct weight, specified during creation.

## Design Pattern
The project follows the Serverless architecture, utilizing AWS Lambda functions for handling specific tasks. The Microservices design pattern is employed, where each function is responsible for a well-defined task, promoting modularity and scalability.

## Project Structure

- `functions/`: Contains individual Lambda functions, each catering to a specific task.
- `tests/`: Holds Jest test scripts for each function.
- `serverless.yml`: Serverless Framework configuration defining AWS services and event triggers.

## Logic
1. **Create Truck** (`createTruck`):
   - Accepts truck details and creates a new truck record.
   
2. **Load Parcel** (`loadParcel`):
   - Accepts a truck ID and parcel details.
   - Checks if the truck exists and calculates the new truck weight.
   - Adds the parcel to the truck's load.

3. **Unload Parcel** (`unloadParcel`):
   - Accepts a truck ID and parcel ID.
   - Validates the truck and unloads the specified parcel.
   - Adjusts the truck's weight accordingly.

## Optimization
- **Database**: Utilize a scalable and efficient database like Amazon DynamoDB to store truck and parcel information.
- **Caching**: Implement caching mechanisms to reduce database hits for frequently accessed data.
- **Parallelism**: Design functions to work in parallel, optimizing resource utilization.
- **Compression**: Compress data during transmission to minimize latency.

## Validation Process
- **Input Validation**: Validate input data for each function to ensure correct format and required fields.
- **Truck Existence**: Check if the provided truck ID exists before loading/unloading parcels.
- **Weight Limit**: Validate and manage truck weight limits when loading parcels.

## Testing with Jest
- Jest is used for unit testing.
- Each function has an associated test script in the `tests/` directory.
- Mocking is employed to simulate AWS service interactions.
- Tests cover various scenarios, including valid inputs, error cases, and edge cases.

## Conclusion
The Parcel Company Service provides an efficient solution for managing parcels within a parcel company's operations. Leveraging serverless architecture, AWS Lambda, and the Serverless Framework, the project ensures scalability, modularity, and maintainability. The use of a Microservices design pattern facilitates independent function development and testing. Continuous optimization, input validation, and comprehensive testing contribute to a robust and reliable service.

For any inquiries or further assistance, please contact the development team.

*Note: This documentation provides an overview of the project. Detailed code and implementation specifics are not included.*


