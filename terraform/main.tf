terraform {
  required_version = ">= 1.5.0"

  required_providers {
    kind = {
      source  = "tehcyx/kind"
      version = "~> 0.5"
    }
  }
}

provider "kind" {}

# Provisions a local Kubernetes cluster using Kind (Kubernetes in Docker).
# This lets us demonstrate real Infrastructure-as-Code driven cluster
# provisioning without needing a paid cloud account.
resource "kind_cluster" "cicd_demo" {
  name           = var.cluster_name
  wait_for_ready = true

  kind_config {
    kind        = "Cluster"
    api_version = "kind.x-k8s.io/v1alpha4"

    node {
      role = "control-plane"
    }

    node {
      role = "worker"
    }
  }
}
