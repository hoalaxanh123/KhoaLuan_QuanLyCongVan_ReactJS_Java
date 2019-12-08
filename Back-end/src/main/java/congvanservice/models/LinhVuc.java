package congvanservice.models;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "LinhVuc")
@ApiModel(description = "Lĩnh vực")
public class LinhVuc {
    @Id
    @Column(name="MaLinhVuc")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(notes = "Mã lĩnh vực")
    Integer maLinhVuc;

    @Column(name="TenLinhVuc", columnDefinition = "nvarchar")
    @ApiModelProperty(notes = "Tên lĩnh vực")
    String tenLinhVuc;

    @Column(name="TenVietTat", length = 20)
    @ApiModelProperty(notes = "Tên viết tắt")
    String tenVietTat;
}
