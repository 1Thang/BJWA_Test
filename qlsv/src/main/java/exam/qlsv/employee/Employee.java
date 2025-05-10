package exam.qlsv.employee;

import exam.qlsv.department.Department;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
@Entity
@Getter
@Setter
public class Employee {
  @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private Integer age;
    private Double salary;
    private String bloodGroup;

    @Lob
    private String photoBase64;

    @ManyToOne
    private Department department;


}
