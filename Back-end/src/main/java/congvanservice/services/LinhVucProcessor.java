package congvanservice.services;

import congvanservice.models.LinhVuc;
import congvanservice.repositories.LinhVucRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LinhVucProcessor implements LinhVucService {
    @Autowired
    private LinhVucRepository linhVucRepository;

    @Override
    public Optional<LinhVuc> findLinhVucById(Integer maLinhVuc) {
        return linhVucRepository.findById(maLinhVuc);
    }

    @Override
    public LinhVuc saveLinhVuc(LinhVuc linhVuc) {
        System.out.println("Save successfully");
        return linhVucRepository.save(linhVuc);
    }

    @Override
    public LinhVuc updateLinhVuc(LinhVuc linhVuc) {
        System.out.println("Update successfully");
        return linhVucRepository.save(linhVuc);
    }

    @Override
    public void deleteLinhVuc(Integer maLinhVuc) {
        System.out.println("Delete successfully");
        linhVucRepository.deleteById(maLinhVuc);
    }

    @Override
    public List<LinhVuc> findAll() {
        return linhVucRepository.findAll();
    }
}
