package exam.qlsv.employee;
import org.springframework.data.jpa.domain.Specification;

public class EmployeeSpecification {
  public static Specification<Employee> containsKeyword(String keyword) {
        return (root, query, cb) -> {
            if (keyword == null || keyword.isEmpty()) return null;
            String pattern = "%" + keyword.toLowerCase() + "%";
            return cb.or(
                cb.like(cb.lower(root.get("name")), pattern),
                cb.like(cb.lower(root.get("bloodGroup")), pattern),
                cb.like(cb.lower(root.get("department").get("nameDepartment")), pattern)
            );
        };
    }
}
