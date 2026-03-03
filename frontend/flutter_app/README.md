# My Flutter App

This project is structured using Clean Architecture principles, which separates the application into distinct layers to promote maintainability, testability, and scalability. Below is an overview of the project structure and its components.

## Project Structure

- **lib/**: Contains the main codebase for the Flutter application, organized into layers.
  - **domain/**: This layer includes the core business logic, entities, and value objects. It serves as a placeholder for defining the domain models and business rules.
  - **application/**: This layer contains use cases and application-specific logic, defining the interactions between the domain and presentation layers.
  - **presentation/**: Responsible for the user interface and user interaction. It includes the entry point of the application (`main.dart`) and the bootstrap logic (`bootstrap.dart`).
  - **infrastructure/**: This layer includes data sources, repositories, and external services, defining how data is fetched and stored.

## Setup Instructions

1. Clone the repository.
2. Navigate to the project directory.
3. Run `flutter pub get` to install dependencies.
4. Use `flutter run` to start the application.

## Overview

This Flutter application is designed to be modular and follows best practices for software architecture. Each layer has its own responsibilities, making it easier to manage and evolve the codebase over time.