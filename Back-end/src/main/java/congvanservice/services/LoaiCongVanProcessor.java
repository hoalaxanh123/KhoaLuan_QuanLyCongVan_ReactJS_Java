package congvanservice.services;

import congvanservice.models.LoaiCongVan;
import congvanservice.repositories.LoaiCongVanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LoaiCongVanProcessor implements LoaiCongVanService{
    @Autowired
    private LoaiCongVanRepository loaiCongVanRepository;
    @Override
    public Optional<LoaiCongVan> findLoaiCongVanById(Integer id) {
        return loaiCongVanRepository.findById(id);
    }

    @Override
    public LoaiCongVan saveLoaiCongVan(LoaiCongVan loaiCongVan) {
        System.out.println("Save successfully");
        return loaiCongVanRepository.save(loaiCongVan);
    }

    @Override
    public LoaiCongVan updateLoaiCongVan(LoaiCongVan loaiCongVan) {
        System.out.println("Update successfully");
        return loaiCongVanRepository.save(loaiCongVan);
    }

    @Override
    public void deleteLoaiCongVan(Integer id) {
        System.out.println("Delete successfully");
        loaiCongVanRepository.deleteById(id);
    }

    @Override
    public List<LoaiCongVan> findAll() {
        return loaiCongVanRepository.findAll();
    }
}
