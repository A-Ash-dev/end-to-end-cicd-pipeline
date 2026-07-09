output "kubeconfig_path" {
  description = "Path to the kubeconfig file for the provisioned Kind cluster"
  value       = kind_cluster.cicd_demo.kubeconfig_path
}

output "cluster_name" {
  description = "Name of the provisioned Kind cluster"
  value       = kind_cluster.cicd_demo.name
}
