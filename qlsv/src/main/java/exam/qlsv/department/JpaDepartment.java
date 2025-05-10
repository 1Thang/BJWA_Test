package exam.qlsv.department;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaDepartment  extends JpaRepository<Department, Integer> {
    // Custom query methods can be defined here if needed
    // For example:
    // List<Department> findByName(String name);
    
}
