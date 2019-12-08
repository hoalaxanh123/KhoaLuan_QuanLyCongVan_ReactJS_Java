package congvanservice.repositories;

import congvanservice.models.LinhVuc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LinhVucRepository extends JpaRepository<LinhVuc, Integer> {
}
