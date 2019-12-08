package congvanservice.repositories;

import congvanservice.models.LoaiCongVan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoaiCongVanRepository extends JpaRepository<LoaiCongVan, Integer> {
}
