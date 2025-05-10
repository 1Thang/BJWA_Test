package exam.qlsv.employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface JpaEmployee  extends JpaRepository<Employee, Integer> , JpaSpecificationExecutor<Employee> {
    // Custom query methods can be defined here if needed
    // For example:
    // List<Employee> findByName(String name);, J
    
}
