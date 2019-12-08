package congvanservice.repositories;

import congvanservice.models.CongVan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CongVanRepository extends JpaRepository<CongVan, Integer> {
}
